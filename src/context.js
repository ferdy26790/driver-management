import { useContext, createContext, useState, useEffect, useRef } from 'react';
import normalize from './hooks/normalizeData';
export const StoreContext = createContext();

export const useStoreContext = () => useContext(StoreContext);

export const StoreProvider = (props) => {
  const { children } = props;
  const firstRender = useRef(true);
  const [drivers, setDrivers] = useState({
    rawData: [],
    data: {},
    pagination: {
      page: 1,
      totalPage: 0
    },
    meta: {
      status: 'SUCCESS',
      error: null
    }
  })
  const [search, setSearch] = useState('')
  
  useEffect(() => {
    fetch('https://randomuser.me/api/?results=12')
    .then((response) => response.json())
    .then((data) => {
      const totalPage = Math.ceil(Math.abs(data.results.length/5))
      const dataNormalize = normalize(data.results, totalPage) // reformat data to be object with key for pagination
      setDrivers({
        meta: {
          status: 'SUCCESS',
          error: null
        },
        rawData: data.results,
        data: dataNormalize,
        pagination: {
          page: 1,
          totalPage,
        }
      });
      firstRender.current = false
    })
    .catch((err) => {
      setDrivers({
        ...drivers,
        meta: {
          status: 'ERROR',
          error: 'something went wrong'
        }
      })
    })
  }, [])

  useEffect(() => {
    if (search) { // if search is submitted
      const searchDataFound = drivers.rawData.filter((d) => d.name.first.toUpperCase().indexOf(search.toUpperCase()) > -1);
      if (searchDataFound.length > 0) {
        const totalPage = Math.ceil(Math.abs(searchDataFound.length/5))
        const dataNormalize = normalize(searchDataFound, totalPage) // normalize search data found and set data state
        setDrivers({
          ...drivers,
          data: dataNormalize,
          pagination: {
            page: 1,
            totalPage,
          }
        });
      } else {
        setDrivers({
          ...drivers,
          data: null,
          pagination: {
            page: 1,
            totalPage: 0,
          }
        });
      }
    }
  }, [search])

  const handlePagination = (type) => {
    const curPage = drivers.pagination.page
    setDrivers({
      ...drivers,
      pagination: {
        ...drivers.pagination,
        page: type === 'next' ? curPage+1 : curPage-1
      }
    })
  }

  const handleSearch = (val) => {
    setSearch(val);
  }
  
  const store = {
    drivers,
    handlePagination,
    search,
    handleSearch
  };

  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};
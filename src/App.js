import { useState } from 'react';
import Card from './components/Card';
import Pagination from './components/Pagination';
import './App.css';
import 'bootswatch/dist/journal/bootstrap.min.css';
import { useStoreContext } from './context';

function App() {
  const [searchVal, setSearchVal] = useState('');
  const {
    drivers: {
      meta,
      data,
      pagination
    },
    handleSearch,
    handlePagination, 
  } = useStoreContext()
  const onSearchSubmit = () => {
    handleSearch(searchVal)
  }
  return (
    <div className="App">
      <div className="form-group">
        <div className="col-sm-2">
          <input
            type="text"
            className="form-control"
            id="search"
            placeholder="search by first name"
            value={`${searchVal}`}
            onChange={(e) => setSearchVal(e.target.value)}
          />
        </div>
        <button onClick={onSearchSubmit} type="button" className="btn btn-primary">Cari</button>
      </div>
      <div className="container-main">
        <div className="content-container">
        {
          meta.status === 'SUCCESS'
          ?
          data
            ?
            data[pagination.page]?.map((d, idx) => <Card key={Number(idx)} {...d}/>)
            :
            <div id="not-found">DATA NOT FOUND</div>
          :
          <div id="error">ERROR</div>
        }
        </div>
        <Pagination onHandlePagination={handlePagination} {...pagination}/>
      </div>
    </div>
  );
}

export default App;

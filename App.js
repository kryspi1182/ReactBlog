import Navbar from './navbar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import CreateAuthor from './author/createAuthor';
import CreateBlog from './blog/createBlog';
import DetailsBlog from './blog/detailsBlog';
import EditBlog from './blog/editBlog';
import HomeBlog from './blog/homeBlog';
import HomeAuthor from './author/homeAuthor';
import DetailsAuthor from './author/detailsAuthor';
import DeleteBlog from './blog/deleteBlog';
import DeleteAuthor from './author/deleteAuthor';
import EditAuthor from './author/editAuthor';
import Home from './home';

function App() {

  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            
            <Route exact path="/blogs/create">
              <CreateBlog />
            </Route>
            <Route exact path ="/blogs/delete/:blogid/:authorid">
              <DeleteBlog />
            </Route>
            <Route exact path ="/blogs/edit/:id">
              <EditBlog />
            </Route>
            <Route exact path="/blogs/:id">
              <DetailsBlog />
            </Route>
            <Route exact path="/blogs">
              <HomeBlog />
            </Route>
            <Route exact path="/authors/create">
              <CreateAuthor />
            </Route>
            <Route exact path="/authors/delete/:id">
              <DeleteAuthor />
            </Route>
            <Route exact path="/authors/edit/:id">
              <EditAuthor />
            </Route>
            <Route exact path="/authors/:id">
              <DetailsAuthor />
            </Route>
            <Route exact path="/authors">
              <HomeAuthor />
            </Route>
            <Route exact path="/">
              <Home />
            </Route>
          </Switch>
          
        </div> 
      </div>
    </Router>
  );
}

export default App;

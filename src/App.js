import React, { Component } from 'react';
import axios from 'axios';
import Pagination from './components/Pagination'
import List from './components/List'
import UserList from './components/UserList'
import './App.css';

const LOAD_STATE = {
  SUCCESS: 'SUCCESS_PHOTOS',
  ERROR: 'ERROR_PHOTOS',
  SUCCESS_USER: 'SUCCESS_USER',
  ERROR_USER: 'ERROR_USER',
  LOADING: 'LOADING'
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      photos: [],
      users: [],
      name: '',
      totalPhotos: 0,
      perPage: 10,
      currentPage: 1,
      loadState: LOAD_STATE.LOADING
    }
    this.fetchPhotos = this.fetchPhotos.bind(this)
  }


  fetchPhotos(page, url, name) {
    const { perPage, currentUrl, username } = this.state;
    const { appId } = this.props;
    const options = {
      params: {
        client_id: appId,
        page: page,
        per_page: perPage
      }
    };
    axios.get(url || currentUrl, options)
      .then((response) => {
        this.setState({
          photos: response.data,
          totalPhotos: parseInt(response.headers['x-total']),
          currentPage: page,
          loadState: LOAD_STATE.SUCCESS,
          currentUrl: url,
          username: name || username
        });
      })
      .catch(() => {
        this.setState({ loadState: LOAD_STATE.ERROR });
      });
  }
  onInputChange = (e) => {
    if(e.target.value === "") {
      return ;
    }
    const { appId, searchUrl } = this.props;
    const options = {
      params: {
        page: 1,
        per_page: 15,
        client_id: appId,
        query: e.target.value
      }
    }
    axios.get(searchUrl, options)
      .then(resp => {
        this.setState({
          users: [...resp.data.results],
          userLoadState: LOAD_STATE.SUCCESS_USER
        })
      })
      .catch(() => {
        this.setState({ userLoadState: LOAD_STATE.ERROR_USER, users:[] });
      })
  }
  render() {
    const { userLoadState, loadState, photos, currentPage, perPage, totalPhotos, users, username} = this.state;
    return (
      <div className="app">
        <div className="app__sidebar">
          <input type="text" name="name" onChange={this.onInputChange} />
          <div>
            {
              userLoadState === LOAD_STATE.SUCCESS_USER
                ? <UserList users={users} fetchPhotos={this.fetchPhotos} username={username} />
                : userLoadState === LOAD_STATE.ERROR_USER 
                ? <div className="app__text">Something has gone wrong</div> 
                : <div className="app__text">Try searching a user</div>
            }
          </div>
        </div>
        <div className="app__content">
        <p className="app__text">Photo Display</p>
          {loadState === LOAD_STATE.SUCCESS && <Pagination
            current={currentPage}
            total={totalPhotos}
            perPage={perPage}
            onPageChanged={this.fetchPhotos.bind(this)}
          />}
          {this.state.loadState === LOAD_STATE.SUCCESS
            ? <List data={photos} />
            : loadState === LOAD_STATE.ERROR 
            ? <div className="app__text">Something has gone wrong</div>
            : <div className="app__text">Try searching a user and click on the name. Thier photos will be shown here</div>
          }
        </div>
        <footer className={loadState === LOAD_STATE.SUCCESS && photos.length ? "app__footer-position" : "app__footer"}>
          <div>
            <p className="app__text">
              Made with Unsplash
          </p>
            <p className="app__text">
              Www.Unsplash.com
          </p>
          </div>
          <div>
            <p className="app__text">
              Designed by _user_
            </p>
            <p className="icons8-facebook-f">
              </p>
              <p className="icons8-instagram">
              </p>
          </div>
        </footer>
      </div>
    )
  }
}
export default App;
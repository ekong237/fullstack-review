import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import Search from './components/Search.jsx';
import RepoList from './components/RepoList.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      repos: []
    }
  }

  componentDidMount(){
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'GET',
      contentType: 'application/json',
      success: (databasePullResults) => {
        this.setState({repos: databasePullResults});
        
      }
    })
    // this.search(term);
  }

  search (term) {
    console.log(`${term} was searched`);
    $.ajax({
      url: 'http://localhost:1128/repos',
      method: 'POST',
      data: JSON.stringify({ username: term }),
      contentType: 'application/json',
      success: (databasePullResults) => {
        this.setState({repos: databasePullResults});
        // console.log('>',databasePullResults);
      },
      error: (data) => {
        console.log('error' + data);
      }
    });
  }

  render () {
    return (<div>
      <h1>Github Fetcher</h1>
      <Search onSearch={this.search.bind(this)}/>
      <RepoList repos={this.state.repos}/>
    </div>)
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
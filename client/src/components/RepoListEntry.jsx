import React from 'react';

const RepoListEntry = ({repo}) => (
  <div>
    <div>
      
      <li><a className="repo-title" href = {repo.html_url}> {repo.name}<span>|</span></a><span>from {repo.username}</span></li>
    </div>
  </div>
);

export default RepoListEntry;
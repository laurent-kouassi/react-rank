import React, {useEffect, useState} from 'react';
import { Header, Icon, Image, List } from 'semantic-ui-react'
import { 
    getFollowers,
    getRepoContributors } from '../../api/services';
import { OthersContributors } from '../../components/OthersContributors';

export const PeopleDetails = (props) => {
    const { selectedMember, contributedRepos } = props;
    const [selectedRepoContributors, setSelectedRepoContributors] = useState([]);
    const [selectedRepo, setSelectedRepo] = useState();
    const [openModal, setOpenModal] = useState(false);
    const [followers, setFollowers] = useState([]);

    useEffect(async () => {
        await getRepoContributors(`/${selectedRepo.name}`)
                .then(res => {
                  setSelectedRepoContributors(res.data)
             });

    }, [selectedRepo]);

    useEffect(async () => {
        await getFollowers(`/${selectedMember.login}`)
                .then(res => {
                  setFollowers(res);
              })
    }, []);

    const handleRepo = repo => {
        setSelectedRepo(repo);
        setOpenModal(true);
    };

    return (
        <div>
          <Header as='h2' icon textAlign='center'>
           <Image circular src={selectedMember.avatar_url} />
           <Header.Content>{selectedMember.login}</Header.Content>
          </Header>


          <a style={{marginLeft: 'auto', marginRight: 'auto', textAlign: 'center'}}>
           <Icon name='user' /> { followers?.length }  
          </a>


          {/* <div> */}
           <List divided relaxed>
               {
                   contributedRepos?.map((repo, index) => (
                    <List.Item onClick = { () => handleRepo(repo)}>
                     <List.Icon 
                        name='github'
                        size='large' 
                        verticalAlign='middle' />
                     <List.Content>
                        <List.Header as='a'>{repo.name}</List.Header>
                        <List.Description as='a'>{repo.description}</List.Description>
                     </List.Content>
                   </List.Item> 
                   ))
                }
           </List>
          {/* </div> */}

          <OthersContributors 
             openModal = { openModal }  
             setOpenModal = { setOpenModal }
             selectedRepoContributors = { selectedRepoContributors } />
        </div>
    )
}

import React, { useState, useEffect } from 'react';
import { Contributors } from '../contributors/Contributors';
import { Headers } from '../../components/Headers';
import { Grid, Image } from 'semantic-ui-react';
import { PeopleDetails } from '../details/PeopleDetails';
import { getOrgsData, getRepoContributors } from '../../api/services';

export const Homepage = () => {
    const [allRepository, setAllRepository] = useState([]);
    const [selectedMember, setSelectedMember] = useState();

    const contributedRepos = [];

    // get all repository
    useEffect(async () => {
        await getOrgsData('/repos')
                      .then(res => {
                          setAllRepository(res.data);
                      });
    }, []);


    // get contributors by repository
    useEffect( () => {
        if(selectedMember){
            allRepository?.forEach(repo => {
                   getRepoContributors(`/${repo.name}`)
                                .then(contributors => {

                                    contributors.data?.forEach(contributor => {
                                        if(contributor.login === selectedMember.login){
                                            contributedRepos.push(repo);  // only contributed repository by member
                                        }
                                    });

                                })
            });
        }

    }, [selectedMember]);


    return (
        <>
         <Headers />
         
         <Grid>
            <Grid.Row>
                <Grid.Column width={4}>
                  <Contributors 
                     selectedMember = {selected => setSelectedMember(selected) } />
                </Grid.Column>
                <Grid.Column width={8} style={{marginLeft: '90px', marginTop: '170px'}}>
                   { 
                     selectedMember ?
                        <PeopleDetails 
                            selectedMember = { selectedMember } 
                            contributedRepos = { contributedRepos } /> :
                        <div>
                         <h2>Please select a member at the left panel...</h2>
                         <p>Make sure you do not have api limited request</p>
                        </div>
                        
                   }
                </Grid.Column>
            </Grid.Row>
        </Grid>
        </>
    )
};

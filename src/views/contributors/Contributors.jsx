import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { List } from 'semantic-ui-react';
import { getOrgsData } from '../../api/services';
import { People } from '../../components/People';

export const Contributors = (props) => {
    const { selectedMember } = props;
    const [people, setPeople] = useState([]);
console.log(selectedMember);
    useEffect(async () => {
        await getOrgsData('/members')
                      .then(res => {
                          setPeople(res.data);
                          console.log(res.data);
                      });
    }, []);

    return (
        <List 
          divided 
          relaxed 
          style={{width: '400px', marginTop: '20px'}}>
            {
                people?.map((people, index) => (
                    <People 
                      key = {index}
                      people = { people }
                      selectedMember = { selectedMember }/>
                ))
            } 
        </List>
        )

};

import React from 'react';
import { List, Header, Image } from 'semantic-ui-react';

export const People = (props) => {
    const {
        avatar_url,
        login
    } = props.people;

    const {
        selectedMember
    } = props;
    
    return (
        // <div onClick = {() => selectedMember(props.people)}>
         <List.Item onClick = {() => selectedMember(props.people)}>
                <Image circular width='50' src={avatar_url} /> 
                <List.Content>
                    <List.Header as='a'>{login}</List.Header>
                </List.Content>
         </List.Item> 
        // </div>
    )
};

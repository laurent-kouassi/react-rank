import React from 'react';
import { Modal, List, Image, Header, Button } from 'semantic-ui-react';

export const OthersContributors = (props) => {
    const {
        openModal, 
        setOpenModal,
        selectedRepoContributors} = props;
    return (
        <div>
            <Modal
                onClose={() => setOpenModal(false)}
                open={openModal}
            >
              <Modal.Header>Other Contributors</Modal.Header>
                <Modal.Content image>

                    <Modal.Description>
                      <Header>Others Contributors</Header>
                        <List divided relaxed>
                         {
                          selectedRepoContributors?.map((contributor, index) => (
                            <List.Item>
                              <Image circular width='50' src={contributor.avatar_url} /> 
                              <List.Content>
                                  <List.Header as='a'>{contributor.login}</List.Header>
                              </List.Content>
                            </List.Item>
                          ))
                         }
                        </List>
                    </Modal.Description>
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        content="Close"
                        labelPosition='right'
                        icon='checkmark'
                        onClick={() => setOpenModal(false)}
                        positive
                    />
                </Modal.Actions>
            </Modal>
        </div>
    )
}

import axios from 'axios';
import { ORGS_BASE_URL, REPOS_URL, USERS_URL } from './env';

export const getOrgsData = async (request) => {
   return await axios.get(ORGS_BASE_URL + request)
};

export const getRepoContributors = async (repo) => {
    return await axios.get(REPOS_URL + repo +'/contributors')
};

export const getFollowers = async (user_name) => {
    return await axios.get(USERS_URL + user_name + '/followers')
};

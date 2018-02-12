# Treedit
[![Build Status](https://travis-ci.org/yong-jie/treedit.svg?branch=master)](https://travis-ci.org/yong-jie/treedit)

Reddit / Digg clone for Carousell's coding challenge.

A demonstration can be found on https://why-are-trees-inverted-irl.herokuapp.com.

# Code Ownership
The skeleton of the repository was generated with [express-babel](https://github.com/vmasto/express-babel) and [create-react-app](https://github.com/facebook/create-react-app). I take ownership and accountability over all other lines of code (all commits apart from initial commit, including all branches) in this repository.

## License
To respect express-babel's MIT license, the code in this repository will also follow the MIT license.

# Installation
Start by cloning the repository:
```sh
git clone https://github.com/yong-jie/treedit.git
```
Enter the repository:
```sh
cd treedit
```
Install dependencies on both backend and frontend:
```sh
npm install && cd client && npm install && cd ..
```
Build backend and frontend:
```sh
npm run build-all
```
Start the server:
```sh
npm start
```


# Repository Structure
This repository contains code for the backend(powered by express), and frontend (react) located in the client directory. This structure was chosen because it decouples both the code for the frontend and backend. As the web application scales in complexity, separating these two components will be as simple as moving the client directory out of the repository.

This structure was also chosen for its ease of deployment to heroku--only one repository is needed for both the backend server and frontend client to be served by the same heroku dynos. The frontend component that is served to the client communicates with the server through APIs.

# Key Decisions
Here I document several key decisions made when designing the structure of the stack/software

## Storing both upvotes and downvotes rather than just the cumulative score
This was done to allow the development for future functionality such as sorting by the degree of controversy, which requires the magnitude of upvotes and downvotes rather than just the cumulative result.

## Uniqueness
The [German Tank Problem](https://en.wikipedia.org/wiki/German_tank_problem) has shown time and time again that the current uniqueness scheme of incremental integers is a bad practice, yet it is the simplest solution for an MVP/proof of concept. To allow for easy switching of uniqueness schemes, I have decoupled the code responsible for generating unique IDs rather than having it embedded in TopicManager's class.

## Data Structure and Sorting Algorithm
The data structure used by `TopicManager` to store and manage the topics is the standard javascript's array. The array is sorted according to each topic's score, in descending order. To allow for quick retrieval, the `TopicManager` class also uses a hash-based lookup table (in the form of a javascript `{}` object). 

To ensure that the array remains sorted every insertion/upvote/downvote, a modified bubble sort algorithm was used. The implementation of the `singleBubbleSort` algorithm can be found in the `TopicManager` class. Taking into consideration of the fact that every insertion/upvote/downvote operation has at most one unsorted element, the `singleBubbleSort` is guaranteed to sort the array with at most one iteration through the array of topics, making it O(n).

With these data structures and algorithms in place, here are the time complexities for each operation:

- Retrieval of the top n topics: O(1)
- Upvote/downvote topic: O(n)
- Create topic: O(n)

In practice, the scores of topics tend to be spaced far apart, and hence the `singleBubbleSort` method rarely iterates through more than one element and terminates early during an upvote/downvote operation, exceeding the performance of a tree data structure. This hierarchy of speed mirrors the usage frequency in a real-world scenario, where views > votes > topics created. 
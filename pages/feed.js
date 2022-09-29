import { PostRepository } from '@amityco/js-sdk';
import { useEffect } from 'react';

export default function Feed({isConnected,data}) {


    function queryPostData(){
        console.log('=====start query=====')
        const liveFeed = PostRepository.queryMyPosts()

        liveFeed.once('dataUpdated', posts => {
            console.log(posts.map(post => post))
        });
        console.log('liveFeed: ', liveFeed);
        const liveFeed2 = PostRepository.queryUserPosts({
          userId: 'johnwick2',
      });
      
      liveFeed2.once('dataUpdated', posts => {
          console.log('test2',posts.map(post => post.postId))
      });
   
    }
    useEffect(() => {
   if(isConnected){
       queryPostData()
   }
    }, [isConnected])
    

    return (
      <div >
          {isConnected ? 'Connect Successfully':'Disconnect'}
      </div>
    )
  }

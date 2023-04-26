import {
  PostRepository,
  MessageRepository,
  ReactionRepository,
  CommunityRepository,
  CommunityUserSortingMethod,
  UserRepository,
  ChannelRepository,
  ChannelType,
  ChannelFilter,
  ChannelSortingMethod
} from "@amityco/js-sdk";
import { useEffect, useState } from "react";

export default function Feed({ isConnected, data }) {
  const [hasMoreData, setHasMoreData] = useState(false);
  const [communityMemberCollection, setCommunityMemberCollection] = useState();
  const [communityMember, setCommunityMember] = useState();
  console.log("communityMember: ", communityMember);

  function queryChannel() {
    // const liveChannel = ChannelRepository.getChannel(
    //   "63a035d0a00df36d86b7a083"
    // );

    // liveChannel.once("dataUpdated", (data) => {
    //   console.log("data: ", data);
    // });
    const liveCollection = ChannelRepository.queryChannels({
      filter: ChannelFilter.Member,
      sortBy: ChannelSortingMethod.LastCreated
    });
    
    liveCollection.on('dataUpdated', models => {
      console.log('Channel models: ', models);
     
    });
  }
  function queryChannelMember() {
    const liveCollection = ChannelRepository.queryMembers({
      channelId: "64184a06bf75befb74db3a07",
    });

    liveCollection.on("dataUpdated", (newModels) => {
      console.log("channel members: ", newModels);
    });
  }

  function queryCommunityMember() {
    const members = CommunityRepository.getCommunityMembers({
      communityId: '63dd3435a12d9efc88e17e08',
      sortBy: CommunityUserSortingMethod.displayName,
      // roles: ["community-moderator", "channel-moderator"],
    });

    members.on("dataUpdated", (models) => {
      console.log("Members community", models);
    });
    members.on("loadingStatusChanged", ({ oldValue, newValue }) => {
      if (members && members.loadingStatus === "loaded" && members.hasMore) {
        members.nextPage();
      }
    });

  }
  // useEffect(() => {
  //   if(hasMoreData){
  //     communityMemberCollection.nextPage()
  //   }
  // }, [hasMoreData, communityMemberCollection])

  function joinChannel() {
    const liveChannel = ChannelRepository.createChannel({
      type: ChannelType.Conversation,
      userIds: ["2.0.5fdfb.220d2824", "2.2.5fdfb.2200363e"],
      displayName: "center frame user test",
    });

    liveChannel.once("dataUpdated", (model) => {
      console.log("model: ", model);
      // navigate('/chat/' + model.channelId);
      // dispatch(connect(model.channelId));
    });

    liveChannel.once("dataError", (error) => {
      // Handle channel create error (non-unique channelID);
      console.log("failed to create channel", error);
    });
  }
  function queryUser() {
    const liveObject = UserRepository.getUser("Charlotte_SchoolAdmin");
    liveObject.on("dataUpdated", (user) => {
      console.log("user: ", user);
      // user is successfully fetched
    });
  }
  function queryPostData() {
    console.log("=====start query=====");
    const liveFeed = PostRepository.queryMyPosts();

    liveFeed.once("dataUpdated", (posts) => {
      console.log(posts.map((post) => post));
    });
    console.log("liveFeed: ", liveFeed);
    const liveFeed2 = PostRepository.queryUserPosts({
      userId: "johnwick2",
    });

    liveFeed2.once("dataUpdated", (posts) => {
      console.log(
        "test2",
        posts.map((post) => post.postId)
      );
    });
  }
  function queryPostData() {
    console.log("=====start query=====");
    const liveFeed = PostRepository.queryMyPosts();

    liveFeed.once("dataUpdated", (posts) => {
      console.log(posts.map((post) => post));
    });
    console.log("liveFeed: ", liveFeed);
    const liveFeed2 = PostRepository.queryUserPosts({
      userId: "johnwick2",
    });

    liveFeed2.once("dataUpdated", (posts) => {
      console.log(
        "test2",
        posts.map((post) => post.postId)
      );
    });
  }
  function queryCategory() {
    const liveCategory = CommunityRepository.categoryForId(
      "cb662760f55a5922116d0089e993f353"
    );

    liveCategory.once("dataUpdated", (data) => {
      console.log("Category", data);
    });
  }
  async function queryMessage() {
    // const liveCollection = MessageRepository.queryMessages({
    //   channelId: "6356aae329c954f31ea80cf8",
    // });
    // let messages = liveCollection.models;
    // liveCollection.on("dataUpdated", (data) => {
    //   messages = data;
    //   console.log("messages: ", messages);
    // });
    // const isMessageReactionAdded = await MessageRepository.addReaction({
    //   messageId: "6353b16cf51194e8e3510875",
    //   reactionName: "love",
    // });
    // console.log("isMessageReactionAdded: ", isMessageReactionAdded);
    // const liveCollection = ReactionRepository.queryReactions({
    //   referenceId: "6353b16cf51194e8e3510875",
    //   referenceType: "message",
    // });
    // liveCollection.on("dataUpdated", (reactions) => {
    //   // reactions are successfully fetched
    //   console.log("Reactions", reactions);
    // });
    // const isMessageReactionRemoved = await MessageRepository.removeReaction({
    //   messageId: "6353b16cf51194e8e3510875",
    //   reactionName: "Like",
    // });
    // console.log("isMessageReactionRemoved: ", isMessageReactionRemoved);
  }
  useEffect(() => {
    if (isConnected) {
      // queryUser();
      queryChannel();
      // queryPostData();
    }
  }, [isConnected]);

  return (
    <div>
      {isConnected ? "Connect Successfully" : "Disconnect"}
      <button onClick={async () => await queryMessage()}>test</button>
      <button onClick={async () => joinChannel()}>test join channel</button>
      <button onClick={async () => queryCategory()}>query category</button>
      <button onClick={async () => queryChannelMember()}>
        query channel member
      </button>
      <button onClick={async () => queryCommunityMember()}>
        query community member
      </button>
    </div>
  );
}

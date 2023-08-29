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
  ChannelSortingMethod,
  FollowRequestStatus,
  MemberFilter,
  AmityUserTokenManager,
  ApiRegion,
} from "@amityco/js-sdk";
import { useEffect, useState } from "react";

export default function Feed({ isConnected, data }) {
  const [hasMoreData, setHasMoreData] = useState(false);
  const [communityMemberCollection, setCommunityMemberCollection] = useState();
  const [communityMember, setCommunityMember] = useState();
  console.log("communityMember: ", communityMember);


  function queryChannel() {
    const liveCollection = ChannelRepository.queryChannels({

      filter: ChannelFilter.Member,
      sortBy: ChannelSortingMethod.LastCreated,

    });
    console.log('liveCollection: ', liveCollection);
    liveCollection.on('dataUpdated', models => {
      console.log('Channel models: ', models);

    });
  }
  function queryChannelMember() {
    const liveCollection = ChannelRepository.queryMembers({
      channelId: "6421a2f271dfbc6449a99886",
      memberships: [MemberFilter.Banned],
    });

    liveCollection.on("dataUpdated", (newModels) => {
      console.log("channel members: ", newModels);
    });
  }

  let memberCollection;
  console.log('memberCollection: ', memberCollection);
  function queryCommunityMember() {
    const members = CommunityRepository.getCommunityMembers({
      communityId: 'a2399f0ba0834d11f681f5cfa569d33c',
      sortBy: CommunityUserSortingMethod.displayName,
    });
    memberCollection = members
    memberCollection.on("dataUpdated", (models) => {
      console.log("Members community", models);
    });


  }
  function callPrevPage() {
    if (memberCollection && memberCollection.loadingStatus === "loaded" && memberCollection.hasMore) {
      memberCollection.prevPage();
    }
  }
  function callNextPage() {
    if (memberCollection && memberCollection.loadingStatus === "loaded" && memberCollection.hasMore) {
      console.log('memberCollection: ', memberCollection);
      memberCollection.nextPage();
    }



  }
  function ReactionQuery(){
    const liveCollection = ReactionRepository.queryReactions({
      referenceId: '64ad09df1e04fe812c5868b5',
      referenceType: 'post',
    });
    liveCollection.on('dataUpdated', reactions => {
      // reactions are successfully fetched
      console.log('Reactions', reactions);
    });
  }

  function joinChannel() {
    const liveChannel = ChannelRepository.createChannel({
      type: ChannelType.Conversation,
      userIds: ["2.0.5fdfb.220d2824", "2.2.5fdfb.2200363e"],
      displayName: "center frame user test",
    });

    liveChannel.once("dataUpdated", (model) => {
      console.log("model: ", model);
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

  useEffect(() => {
    if (isConnected) {
      queryChannel();
    }
  }, [isConnected]);

  function queryMessageFromChannel() {
    const liveCollection = MessageRepository.queryMessages({
      channelId: '633ecbfce0c43d1cad00d65a',
    });
    liveCollection.once("dataUpdated", (data) => {
      console.log("messages", data);
    });
  }

  let followListCollection;
  function getFollowingUsers() {
    const liveFollowersList = UserRepository.getFollowings(
      'top',
      FollowRequestStatus.Accepted,
    );

    followListCollection = liveFollowersList
    console.log('liveFollowersList: ', liveFollowersList);
    liveFollowersList.once('dataUpdated', data => {
      console.log('Followers', data);
    });
  }
  function callNextFollowListPage() {
    followListCollection.nextPage();
  }
  async function getAccessToken() {

    console.log('accessToken: ');
    const { accessToken, err } = await AmityUserTokenManager.createUserToken("b3babb0b3a89f4341d31dc1a01091edcd70f8de7b23d697f", ApiRegion.SG, {
      userId: 'top'
    });
  }

  let reactionLiveCollection;

  function getReactions() {

    const liveCollection = ReactionRepository.queryReactions({
      referenceId: '64be2bda27d3baed6af040e1',
      referenceType: 'post',
      r
    });
    liveCollection.on('dataUpdated', reactions => {
      // reactions are successfully fetched
      console.log('Reactions', reactions);
    });
  }

  
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
      <button onClick={async () => callNextPage()}>
        Call next page
      </button>
      <button onClick={async () => callPrevPage()}>
        Call prev page
      </button>
      <button onClick={() => queryMessageFromChannel()}> query Messages</button>
      <button onClick={async () => getFollowingUsers()}>
        Following
      </button>
      <button onClick={async () => callNextFollowListPage()}>
        Next page Following
      </button>
      <button onClick={async () => getAccessToken()}>
        Access Token
      </button>
      <button onClick={async () => getReactions()}>
      Get Reactions
      </button>
    </div>
  );
}

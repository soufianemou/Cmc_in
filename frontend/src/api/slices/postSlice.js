import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    posts: [],
    postsBasedOnPageNum: [],
    postsCount: null,
    post: null,
    isPostCreated:false,
    loading:false,
    isPostFetched:false,
    isPostsFetched:false
};
const postSlice = createSlice({
    name: "post",
    initialState: initialState,
    reducers: {
        setPosts: (state, action) => {
            state.posts = action.payload;
        },
        setPostsBasedOnPageNum: (state, action) => {
            state.postsBasedOnPageNum = action.payload;
        },
        setPostsCount: (state, action) => {
            state.postsCount = action.payload;
        },
        setPost: (state, action) => {
            state.post = action.payload;
        },
        addpost:(state,action)=>{
            state.posts.push(action.payload)
        },
        updatePosts: (state, action) => {
            state.posts = state.posts.map((post) =>post.id === action.payload.id ? action.payload.post : post);
        },
        setImagePost: (state, action) => {
            state.post.image = action.payload;
        },
        deletePost: (state, action) => {
            state.posts = state.posts.filter((post) => post.id !== action.payload);
        },
        setLike: (state, action) => {
            state.post.likers = action.payload.likers;
        },
        setComments: (state, action) => {
            state.post.comments = action.payload
        },
        updateComment:(state,action)=>{
            state.post.comments = state.post.comments.map(com=>
                com.id === action.payload.id ? {...com, body:action.payload.newComment.body}  : com )           
        },
        deleteComment: (state, action) => {
            const comment = state.post.comments.find(com=>com.id === action.payload)
            const commentIndex = state.post.comments.indexOf(comment)
            state.post.comments.splice(commentIndex,1)
        },
        setLoading:(state)=>{
            state.loading = true
        },
        clearLoading:(state)=>{
            state.loading = false
        },
        setIsPostCreated:(state)=>{
            state.isPostCreated =true
            state.loading = false
        },
        clearIsPostCreated:(state)=>{
            state.isPostCreated =false
        },
        setIsPostFetched:(state)=>{
            state.isPostFetched =true
            state.loading = false
        },
        clearIsPostFetched:(state)=>{
            state.isPostFetched =false
        },
        setIsPostsFetched:(state)=>{
            state.isPostsFetched =true
            state.loading = false
        },
        clearIsPostsFetched:(state)=>{
            state.isPostsFetched =false
        },
    },
});

export const {
    setPosts,
    setPostsCount,
    setPost,
    setPostsBasedOnPageNum,
    addpost,
    updatePosts,
    setImagePost,
    setLike,
    deletePost,
    setComments,
    updateComment,
    deleteComment,
    setLoading,
    clearLoading,
    setIsPostCreated,
    clearIsPostCreated,
    setIsPostFetched,
    clearIsPostFetched,
    setIsPostsFetched,
    clearIsPostsFetched
} = postSlice.actions;

export default postSlice;

import { UserType } from "../types";

export default class ResponseUser {
  user: {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    jobtitle?: string;
    website?: string;
    location?: string;
    friends: string[];
    followers: string[];
    following: string[];
    settings: any;
    posts: [];
  } | null;

  constructor(user: {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    jobtitle?: string;
    website?: string;
    location?: string;
    friends: string[];
    followers: string[];
    following: string[];
    settings: any;
    posts: [];
  }) {
    if (user) {
      this.user = {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
        username: user.username,
        jobtitle: user.jobtitle,
        website: user.website,
        location: user.location,
        friends: user.friends,
        followers: user.followers,
        following: user.following,
        settings: user.settings,
        posts: user.posts,
      };
    } else {
      this.user = null;
    }
  }

  getUser: any = () => {
    return {
      _id: this.user?._id,
      fullname: this.user?.fullname,
      email: this.user?.email,
      username: this.user?.username,
      jobtitle: this.user?.jobtitle,
      website: this.user?.website,
      location: this.user?.location,
      friends: this.user?.friends,
      followers: this.user?.followers,
      following: this.user?.following,
      settings: this.user?.settings,
      posts: this.user?.posts,
    };
  };
}

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
    settings: any;
    posts: string[];
    friends: string[];
    teams: string[];
  } | null;

  constructor(user: {
    _id: string;
    fullname: string;
    email: string;
    username: string;
    jobtitle?: string;
    website?: string;
    location?: string;
    settings: any;
    posts: string[];
    friends: string[];
    teams: string[];
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
        settings: user.settings,
        posts: user.posts,
        friends: user.friends,
        teams: user.teams,
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
      settings: this.user?.settings,
      posts: this.user?.posts,
      friends: this.user?.friends,
      teams: this.user?.teams,
    };
  };
}

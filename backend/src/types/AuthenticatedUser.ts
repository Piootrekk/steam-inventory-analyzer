export interface AuthenticatedUser {
  _json: {
    steamid: string;
    personaname: string;
    avatar: string;
    profileurl: string;
  };
  id: string;
  displayName: string;
  photos: string[];
  provider: string;
}

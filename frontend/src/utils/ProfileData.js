export class ProfileData {
  constructor(name, about, avatarLink) {
    this.name = name;
    this.about = about;
    this.avatarLink = avatarLink;
  }

  toJSON() {
    return {
      name: this.name,
      about: this.about,
      avatar: this.avatarLink,
    }
  }

  static fromJSON(data) {
    return new ProfileData(data.name, data.about, data.avatar);
  }

}

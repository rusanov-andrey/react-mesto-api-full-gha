export class CardData {
  constructor(name, link, owner) {
    this.name = name;
    this.link = link;
    this.owner = owner;
  }

  isOwner() {
    return this.owner;
  }

  toJSON() {
    return {
      name: this.name,
      link: this.link,
    }
  }
  
  static fromJSON(json, profileId) {
    const result = new CardData(json.name, json.link);
    result._id = json._id;
    result.owner = (json.owner._id === profileId);
    result.likeCount = json.likes.length;
    result.myLike = json.likes.map(like => like._id).includes(profileId);

    return result;
  }
}


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
    console.log(`card.owner_id: ${json.owner}; profileId: ${profileId}; likes: ${json.likes}`);
    const result = new CardData(json.name, json.link);
    result._id = json._id;
    result.owner = (json.owner === profileId);
    result.likeCount = json.likes.length;
    result.myLike = json.likes.includes(profileId);

    return result;
  }
}


class TweetsTag

  include ActiveModel::Model
  attr_accessor :message, :name

  with_options presence: true do
    validates :message
    validates :name
  end

  def save
    tweet = Tweet.create(message: message)
    tag = Tag.create(name: name)

    TweetTagRelation.create(tweet_id: tweet.id, tag_id: tag.id)
  end

end
#Formオブジェクトと中間テーブルを用いる際は、中間テーブルにレコードを作成する記述が必要になります。バリデーションも一緒に記述しましょう。
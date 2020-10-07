class TweetsTag

  include ActiveModel::Model
  attr_accessor :message, :name

  with_options presence: true do
    validates :message
    validates :name
  end

  def save
    tweet = Tweet.create(message: message)
    tag = Tag.where(name: name).first_or_initialize #「first_or_initialize」は、whereメソッドと一緒に使います。whereで検索した条件のレコードがあればそのレコードのインスタンスを返し、なければ新しくインスタンスを作るメソッドです。
    tag.save

    TweetTagRelation.create(tweet_id: tweet.id, tag_id: tag.id)
  end

end
# Formオブジェクトと中間テーブルを用いる際は、中間テーブルにレコードを作成する記述が必要になります。バリデーションも一緒に記述しましょう。
# 現状のアプリケーションでは、すでにデータベースに存在する文字列のタグは保存できません。tagsテーブルのnameカラムに一意性の制約を設けているためです。この場合、「tweet」に紐づく「tag」が生成されないため、タグ付け機能としては成り立ちません。
# このように「既存のレコードが存在する場合は、既存のレコードを反映させたい」という場合は、first_or_initializeを使用します。
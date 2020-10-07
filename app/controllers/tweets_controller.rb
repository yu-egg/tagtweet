class TweetsController < ApplicationController

  def index
    @tweets = Tweet.all.order(created_at: :desc)#投稿内容が新しい順で表示されるようにします。
  end

  def new
    @tweet = TweetsTag.new#8行目では「Formオブジェクト」に対してnewメソッドを使用しています。
  end

  def create
    @tweet = TweetsTag.new(tweet_params)#そして、12行目で引数として呼び出しています。
    if @tweet.valid?#createの中の処理は、「もしデータベースに保存できたらトップページへ、
      @tweet.save
      return redirect_to root_path
    else
      render "new"#保存できなければ再度newアクションが起動する」という場合分けをしています。
    end
  end

  private

  def tweet_params
    params.require(:tweets_tag).permit(:message, :name)#まずは、24行目で「message」「name」が送信できるように設定しています。
  end
end

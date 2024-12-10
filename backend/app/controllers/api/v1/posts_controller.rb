class Api::V1::PostsController < ApplicationController

  def index
    @posts = Post.all.order(created_at: :desc)
    render json: @posts.map { |post| post_json(post) }
  end

  def create
    post = Post.new(post_params)
    post.user = current_api_v1_user
    if post.save
      render json: post, status: :created
    else
      render json: post.errors, status: :unprocessable_entity
    end
  end

  private

  def post_params
    params.require(:post).permit(:content, :image)
  end

  def post_json(post)
    {
      id: post.id,
      content: post.content,
      image_url: post.image.attached? ? url_for(post.image) : ""  # 画像がなければ空文字を返すことで投稿がないを防ぐ
    }
  end
end

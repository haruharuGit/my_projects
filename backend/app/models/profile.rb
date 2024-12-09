class Profile < ApplicationRecord
  belongs_to :user

  with_options presence: true do
    validates :nickname, length: { maximum: 10 }
    validates :kid_birthday, numericality: { only_integer: true }
  end
end

class Profile < ApplicationRecord
  belongs_to :user
  has_one_attached :avatar

  validates :nickname, presence: true
  validates :kid_birthday, presence: true
  validate :valid_kid_birthday

  private

  def valid_kid_birthday
    errors.add(:kid_birthday, "is not a valid date") if kid_birthday.present? && !kid_birthday.is_a?(Date)
  end
end

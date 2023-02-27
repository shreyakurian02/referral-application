require "test_helper"

class UserTest < ActiveSupport::TestCase
  def setup
    @user = User.new("email":"exampple@gmail.com", password: "test_password" )
  end

  def test_password_is_required
    @user.password = ""
    assert @user.invalid?
  end

  def test_email_is_required
    @user.email = ""
    assert @user.invalid?
  end

  def test_email_is_valid
    assert @user.valid?

    @user.email = "qwweee"
    assert @user.invalid?
  end
end


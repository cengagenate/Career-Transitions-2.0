require 'test_helper'

class AssessmentControllerTest < ActionController::TestCase
  test "should get interests" do
    get :interests
    assert_response :success
  end

end

module Spree
  module Admin
    class PanelsController < BaseController
      layout "spree/layouts/panel"

      before_action :set_ransack_field

      def user
        @user = Spree::User.find_by_email(params[:identifier])

        render "spree/admin/shared/panels/user"
      end

      def order
        @order = Spree::Order.find_by_number(params[:identifier])

        render "spree/admin/shared/panels/order"
      end

      def shipment
        @shipment = Spree::Shipment.find_by_number(params[:identifier])

        render "spree/admin/shared/panels/shipment"
      end

      private

        def set_ransack_field
          @ransack_field = params[:ransack_field]
        end

    end
  end
end

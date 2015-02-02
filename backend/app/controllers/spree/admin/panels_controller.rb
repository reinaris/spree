module Spree
  module Admin
    class PanelsController < BaseController
      layout "spree/layouts/panel"

      before_action :set_ransack_field
      before_action :panel_identifiers

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

        def panel_identifiers
          @panel_first = (params[:index].to_f == 0)
          @panel_name = "panel_#{ params[:ransack_field] }"
          @panel_heading = "heading_#{ params[:ransack_field] }"
        end

    end
  end
end

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

      def return_authorizations
        @order = Spree::Order.find_by_number(params[:identifier])
        @return_authorizations = @order.return_authorizations

        if @return_authorizations.any?
          render "spree/admin/shared/panels/return_authorizations"
        else
          render nothing: true
        end
      end

      def customer_returns
        @order = Spree::Order.find_by_number(params[:identifier])
        @customer_returns = @collection ||= Spree::ReturnItem
                              .accessible_by(current_ability, :read)
                              .where(inventory_unit_id: @order.inventory_units.pluck(:id))
                              .map(&:customer_return).uniq.compact

        if @customer_returns.any?
          render "spree/admin/shared/panels/customer_returns"
        else
          render nothing: true
        end
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

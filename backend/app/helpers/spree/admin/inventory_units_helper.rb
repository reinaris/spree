module Spree
  module Admin
    module InventoryUnitsHelper

      def popover_shipment_info shipment
        info = "<strong>#{shipment.number}</strong><br/>"
        info << "#{ Spree.t(:state) }: " + Spree.t("states.#{shipment.state}")
        if shipment.shipped_at
          info << "<br/>#{ Spree.t(:shipped_at) }: #{l(shipment.shipped_at.to_date)}"
        else
          info << "<br/>#{ Spree.t(:not_shipped) }"
        end
        info
      end

      def popover_order_info order
        info = "<strong>#{order.number}</strong><br/>"
        info << "#{ Spree.t(:state) }: " + Spree.t("order_states.#{order.state}")
        info << "<br/>#{ Spree.t(:payment_state) }: " + Spree.t("states.#{order.payment_state}")
        info << "<br/>#{ Spree.t(:completed_at) }: #{l(order.completed_at.to_date)}" if order.completed_at
        info << "<br/>#{ Spree.t(:order_total) }: #{ order.display_total.to_html }"
        info
      end

      def popover_user_info user, order
        email = user ? user.email : order.email
        info = "<strong>#{email}</strong><br/>"
        info << popover_address(order.bill_address)
        info
      end

      def popover_address address
        info = "#{address.full_name}<br/>"
        info << "#{address.address1}<br/>" if address.address1
        info << "#{address.zipcode} #{address.city}<br/>" if address.zipcode && address.city
        info << "#{address.country}<br/>" if address.country
        info << "#{address.phone}" if address.phone
        info
      end

    end
  end
end

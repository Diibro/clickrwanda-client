import PropTypes from "prop-types";
import { formatTimeAgo } from "../../../utils/dateFunctions";
import { DeleteButton, EditButton } from "../buttons/ActionButtons";

const DashShopCard = ({shop}) => {
     return (
     <div className="dash-shop-card">
          <div className="row">
               <span>Shop Name: </span>
               <b>{shop.username}</b>
          </div>
          <div className="row">
               <span>Phone: </span>
               <b>{shop.user_phone}</b>
          </div>
          <div className="row">
               <span>Joined: </span>
               <b>{formatTimeAgo(shop.reg_date)}</b>
          </div>
          <div className="row">
               <EditButton title="Update" />
               <DeleteButton title="Deactivate" />
          </div>
     </div>
     )
}

DashShopCard.propTypes = {
     shop: PropTypes.object
}
export default DashShopCard

import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const UserMenuButton = () => {
  return (
    <Link to="/claim">
      <Button className="bg-ocean-600 hover:bg-ocean-700 text-white rounded-full px-6">
        Get Listed
      </Button>
    </Link>
  );
};

export default UserMenuButton;

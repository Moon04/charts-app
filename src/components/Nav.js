import React from "react";
import { Navbar, NavbarBrand, Button } from "reactstrap";

const Nav = ({handleAddChartBtn}) => {
  return (
    <Navbar className="justify-content-between" color="light" light expand="md">
      <NavbarBrand className="font-weight-bold text-secondary" href="/"> Internal dashboard </NavbarBrand>
      <Button id="add-chart-btn" onClick={handleAddChartBtn}> + Add chart </Button>
    </Navbar>
  );
};

export default Nav;

import { Image, MusicNote, SmartDisplay, Widgets } from "@mui/icons-material";
import {
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from "@mui/material";
import { Link } from "react-router-dom";
export const drawerWidth = 240;
export default function SideBar() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <IconButton aria-label="delete" sx={{ p: "17px" }} color="primary">
        <Widgets />
      </IconButton>

      <Divider />
      <List>
        <Link to="/gallary" className="sideBar-link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <Image color="primary" />
              </ListItemIcon>
              <ListItemText primary="Gallary" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/video" className="sideBar-link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <SmartDisplay color="primary" />
              </ListItemIcon>
              <ListItemText primary="Video" />
            </ListItemButton>
          </ListItem>
        </Link>
        <Link to="/audio" className="sideBar-link">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <MusicNote color="primary" />
              </ListItemIcon>
              <ListItemText primary="Audio" />
            </ListItemButton>
          </ListItem>
        </Link>
      </List>
    </Drawer>
  );
}

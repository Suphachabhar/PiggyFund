import React from 'react';
import PropTypes from 'prop-types';
import img_may from '../../picture/may.jpg'
import img_ken from '../../picture/ken.jpg'
import cookie from 'react-cookies'

import {
    Avatar,
    Box,
    Typography,
    makeStyles
} from '@material-ui/core';

const get_pic = () => {
    let userid = cookie.load('userInfo')
    if (userid === "1") {
        return img_may;
    } else {
        return img_ken;
    }
}

const get_name = () => {
    let userid = cookie.load('userInfo')
    if (userid === "1") {
        return "May Li";
    } else {
        return "Ken Wang";
    }
}

const user = {
    avatar: get_pic(),
    city: 'Sydney',
    country: 'Australia',
    jobTitle: 'Software Developer',
    name: get_name(),

};

const useStyles = makeStyles(() => ({
    root: {},
    avatar: {
        height: 100,
        width: 100
    }
}));

const Profile = ({ className, ...rest }) => {
    const classes = useStyles();

    return (
        <>
            <Box
                alignItems="center"
                display="flex"
                flexDirection="column"
            >
                <Avatar
                    className={classes.avatar}
                    src={user.avatar}
                />
                <div style={{ height: 40 }}></div>
                <Typography
                    color="textPrimary"
                    gutterBottom
                    variant="h3"
                >
                    {user.name}
                </Typography>
                <Typography
                    color="textSecondary"
                    variant="body1"
                >
                    {`${user.city} ${user.country}`}
                </Typography>
                <Typography
                    className={classes.dateText}
                    color="textSecondary"
                    variant="body1"
                >
                    <span>Save Money for My Future</span>
                </Typography>
            </Box>
        </>
    );
};

Profile.propTypes = {
    className: PropTypes.string
};

export default Profile;
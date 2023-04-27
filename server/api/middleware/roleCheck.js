import User from '../models/User.js';

const roleCheck = (allowedRoles) => {
    return async (req, res, next) => {
        try {
            // Get user ID from the request (added by auth middleware)
            const userId = req.user.id;

            // Find the user in the database
            const user = await User.findById(userId);

            if (!user) {
                return res.status(404).json({ msg: 'User not found' });
            }

            // Check if the user's role is in the list of allowed roles
            if (allowedRoles.includes(user.role)) {
                next();
            } else {
                return res.status(403).json({ msg: 'Access denied' });
            }
        } catch (error) {
            console.error(error.message);
            res.status(500).send('Server error');
        }
    };
};

export default roleCheck;

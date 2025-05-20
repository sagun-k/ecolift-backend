import cron from 'node-cron';
import Ride, {RIDE_STATUSES} from '../src/models/ride.js';

// Run every minute
cron.schedule('* * * * *', async () => {
    console.log('Checking for expired pending rides...');

    const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000);

    try {
        const expiredRides = await Ride.find({
            status: RIDE_STATUSES.REQUESTED,
            createdAt: { $lt: tenMinutesAgo },
        });

        for (const ride of expiredRides) {
            ride.status = RIDE_STATUSES.CANCELED;
            await ride.save();
            console.log(`Ride ${ride._id} auto-cancelled`);
        }
    } catch (error) {
        console.error('Error auto-cancelling rides:', error);
    }
});

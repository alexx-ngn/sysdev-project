<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Donation Confirmation</title>
</head>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <table role="presentation" style="width: 100%; border-collapse: collapse;">
        <tr>
            <td style="padding: 20px 0; text-align: center; background-color: #f8f9fa;">
                <h1 style="color: #2d3748; margin: 0;">Thank You for Your Donation!</h1>
            </td>
        </tr>
        <tr>
            <td style="padding: 40px 20px;">
                <div style="max-width: 600px; margin: 0 auto;">
                    <p style="font-size: 16px; margin-bottom: 20px;">Dear {{ $donation->user->FirstName }},</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">Thank you for your generous donation to Miles for Hope. Your support makes a real difference in our mission.</p>
                    
                    <div style="background-color: #f8f9fa; padding: 20px; border-radius: 5px; margin: 20px 0;">
                        <h2 style="color: #2d3748; margin-top: 0;">Donation Details</h2>
                        <p style="margin: 10px 0;"><strong>Amount:</strong> ${{ number_format($donation->Amount, 2) }}</p>
                        <p style="margin: 10px 0;"><strong>Date:</strong> {{ $donation->DonationDate->format('F j, Y') }}</p>
                        <p style="margin: 10px 0;"><strong>Confirmation ID:</strong> {{ $donation->ConfirmationID }}</p>
                    </div>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">This email serves as your donation receipt. Please keep it for your records.</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">If you have any questions about your donation, please don't hesitate to contact us.</p>
                    
                    <p style="font-size: 16px; margin-bottom: 20px;">Best regards,<br>Miles for Hope Team</p>
                </div>
            </td>
        </tr>
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8f9fa; font-size: 14px; color: #666;">
                <p style="margin: 0;">© {{ date('Y') }} Miles for Hope. All rights reserved.</p>
            </td>
        </tr>
    </table>
</body>
</html> 
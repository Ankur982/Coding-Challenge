const dotenv = require('dotenv');
const dbConnect = require("./config/dbConnect");
const Account = require("./models/Account")
const readline = require('readline');

//dotenv
dotenv.config();

//connecting to database
dbConnect();


console.log('*************Welcome to the CLI Bank Application*************');

//creating readline of cli

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.question('Enter command:', (line) => {
    handleCommand(line);
    rl.close();
});


// Function to handle user commands
function handleCommand(line) {
    const parts = line.split(' ');
    const command = parts[0];
    const code = parts[1];
    let name;
    let amount;

    if (command === 'CREATE') {
        name = parts[2];
    } else {
        amount = parts[2];
    }

    switch (command) {
        case 'CREATE':
            // Create new account
            const newAccount = new Account({ code, name });
            newAccount.save((err) => {
                if (err) {
                    console.log(`Error creating account: ${err}`);
                } else {
                    console.log(`Account ${code} created for ${name} with initial balance of 0.`);
                }
            });
            break;
        case 'DEPOSIT':
            // Deposit amount to account
            Account.findOneAndUpdate({ code }, { $inc: { balance: amount } }, (err) => {
                if (err) {
                    console.log(`Error depositing amount: ${err}`);
                } else {
                    console.log(`Deposited ${amount} to account ${code}.`);
                }
            });
            break;
        case 'WITHDRAW':
            // Withdraw amount from account

            Account.findOne({ code }, (err, account) => {
                if (err) {
                    console.log(`Error withdrawing amount: ${err}`);
                } else if (!account) {
                    console.log(`Account ${code} not found.`);
                } else if (account.balance < amount) {
                    console.log(`Insufficient balance in account ${code}.`);
                } else {
                    Account.findOneAndUpdate({ code }, { $inc: { balance: -amount } }, (err) => {
                        if (err) {
                            console.log(`Error withdrawing amount: ${err}`);
                        } else {
                            console.log(`Withdrew ${amount} from account ${code}.`);
                        }
                    });
                }
            });
            break;
        case 'BALANCE':
            // Show account balance
            
            Account.findOne({ code }, (err, account) => {
                if (err) {
                    console.log(`Error showing balance: ${err}`);
                } else {
                    console.log(`${code}  ${account.balance}`)
                }

            });
            break;

        default:
            console.log('Invalid command....');
    }
}



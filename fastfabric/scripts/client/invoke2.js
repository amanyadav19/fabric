/*
 * SPDX-License-Identifier: Apache-2.0
 */
'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var fabric_network_1 = require("fabric-network");
var fs = require("fs");
var path = require("path");
var exec = require("child_process");
function main() {
    return __awaiter(this, void 0, void 0, function () {
        var conflictPercentage, endorserIdx, repetitions, transferCount, iteration, bcResps, ccpPath, ccpJSON, ccp, endorserAddresses, user, walletPath, wallet, tIdx, userExists, gateway, network, channel, client, r, i, a, resp, i_1, propResp, res, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    conflictPercentage = parseInt(process.argv[6]);
                    endorserIdx = parseInt(process.argv[5]);
                    repetitions = parseInt(process.argv[4]);
                    transferCount = parseInt(process.argv[3]);
                    iteration = parseInt(process.argv[2]);
                    bcResps = [];
                    ccpPath = path.resolve(__dirname, 'connection.json');
                    ccpJSON = fs.readFileSync(ccpPath, 'utf8');
                    ccp = JSON.parse(ccpJSON);
                    endorserAddresses = exec.execSync("bash printEndorsers.sh").toString().replace("\n", "").split(" ");
                    ccp.name = ccp.name.replace("CHANNEL", process.env.CHANNEL);
                    ccp.organizations.Org1.signedCert.path = ccp.organizations.Org1.signedCert.path.split("DOMAIN").join(process.env.PEER_DOMAIN);
                    ccp.orderers.address.url = ccp.orderers.address.url.replace("ADDRESS", process.env.ORDERER_ADDRESS);
                    ccp.peers.address.url = ccp.peers.address.url.replace("ADDRESS", endorserAddresses[endorserIdx]);
                    user = "Admin@" + process.env.PEER_DOMAIN;
                    console.log("Thread no.: ".concat(iteration, ",\tTx per process: ").concat(transferCount / 2, ",\trepetitions: ").concat(repetitions));
                    walletPath = path.join(__dirname, './wallet');
                    wallet = new fabric_network_1.FileSystemWallet(walletPath);
                    tIdx = 0;
                    _a.label = 1;
                case 1:
                    _a.trys.push([1, 16, , 17]);
                    return [4 /*yield*/, wallet.exists(user)];
                case 2:
                    userExists = _a.sent();
                    if (!userExists) {
                        console.log("An identity for the user \"".concat(user, "\" does not exist in the wallet"));
                        console.log('Run the registerUser.js application before retrying');
                        return [2 /*return*/];
                    }
                    gateway = new fabric_network_1.Gateway();
                    return [4 /*yield*/, gateway.connect(ccp, { wallet: wallet, identity: user, discovery: { enabled: false } })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, gateway.getNetwork(String(process.env.CHANNEL))];
                case 4:
                    network = _a.sent();
                    channel = network.getChannel();
                    client = gateway.getClient();
                    r = 0;
                    _a.label = 5;
                case 5:
                    if (!(r < repetitions)) return [3 /*break*/, 10];
                    i = iteration * transferCount;
                    _a.label = 6;
                case 6:
                    if (!(i < iteration * transferCount + transferCount - 1)) return [3 /*break*/, 9];
                    if (Math.random() <= conflictPercentage / 100) {
                        a = ["account0", "account1", "1"];
                    }
                    else {
                        a = ["account".concat(i.toString()), "account".concat((i + 1).toString()), "1"];
                    }
                    return [4 /*yield*/, channel.sendTransactionProposal({
                            chaincodeId: String(process.env.CHAINCODE),
                            fcn: "transfer",
                            args: a,
                            txId: client.newTransactionID()
                        })];
                case 7:
                    resp = _a.sent();
                    bcResps.push(resp);
                    _a.label = 8;
                case 8:
                    i += 2;
                    return [3 /*break*/, 6];
                case 9:
                    r++;
                    return [3 /*break*/, 5];
                case 10:
                    console.log("Thread ".concat(iteration, ": Endorsement done, got ").concat(bcResps.length, " endorsments for ").concat(transferCount / 2 * repetitions, " transactions"));
                    console.log("Thread ".concat(iteration, ": Start sending transactions"));
                    i_1 = 0;
                    _a.label = 11;
                case 11:
                    if (!(i_1 < bcResps.length)) return [3 /*break*/, 14];
                    propResp = (bcResps[i_1][0]);
                    return [4 /*yield*/, channel.sendTransaction({ proposalResponses: propResp, proposal: bcResps[i_1][1] })];
                case 12:
                    res = _a.sent();
                    if (res.status != "SUCCESS") {
                        console.log("Thread ".concat(iteration, ": ").concat(res.status));
                    }
                    tIdx++;
                    _a.label = 13;
                case 13:
                    i_1++;
                    return [3 /*break*/, 11];
                case 14: 
                // Disconnect from the gateway.
                return [4 /*yield*/, gateway.disconnect()];
                case 15:
                    // Disconnect from the gateway.
                    _a.sent();
                    console.log("Thread ".concat(iteration, " is done!"));
                    return [3 /*break*/, 17];
                case 16:
                    error_1 = _a.sent();
                    console.error("Thread ".concat(iteration, ": Failed to submit transaction ").concat(tIdx, ": ").concat(error_1));
                    process.exit(1);
                    return [3 /*break*/, 17];
                case 17: return [2 /*return*/];
            }
        });
    });
}
main();

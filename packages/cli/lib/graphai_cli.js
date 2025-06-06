#!/usr/bin/env node
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const graphai_1 = require("graphai");
const packages = __importStar(require("@graphai/agents"));
const token_bound_string_agent_1 = require("@graphai/token_bound_string_agent");
const vanilla_node_agents_1 = require("@graphai/vanilla_node_agents");
const stream_agent_filter_1 = require("@graphai/stream_agent_filter");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const yaml_1 = __importDefault(require("yaml"));
const args_1 = require("./args");
const test_utils_1 = require("@receptron/test_utils");
const options_1 = require("./options");
const mermaid_1 = require("./mermaid");
const fileFullPath = (file) => {
    return path_1.default.isAbsolute(file) ? file : path_1.default.resolve(process.cwd(), file);
};
const agents = {
    ...packages,
    tokenBoundStringsAgent: token_bound_string_agent_1.tokenBoundStringsAgent,
    fileReadAgent: vanilla_node_agents_1.fileReadAgent,
    fileWriteAgent: vanilla_node_agents_1.fileWriteAgent,
    pathUtilsAgent: vanilla_node_agents_1.pathUtilsAgent,
};
const main = async () => {
    if (args_1.hasOption) {
        (0, options_1.option)(args_1.args, agents);
        return;
    }
    const file_path = fileFullPath(args_1.args.yaml_or_json_file);
    if (!fs_1.default.existsSync(file_path)) {
        console.log("no file exist: " + file_path);
        return;
    }
    if (args_1.args.log) {
        const logfile = fileFullPath(args_1.args.log);
        (0, test_utils_1.mkdirLogDir)(path_1.default.dirname(logfile));
    }
    try {
        const graph_data = (0, test_utils_1.readGraphaiData)(file_path);
        if (args_1.args.mermaid) {
            (0, mermaid_1.mermaid)(graph_data);
            return;
        }
        if (args_1.args.json) {
            console.log(JSON.stringify(graph_data, null, 2));
            return;
        }
        if (args_1.args.yaml) {
            console.log(yaml_1.default.stringify(graph_data, null, 2));
            return;
        }
        const fds = {};
        let fdsIndex = 3;
        const getFd = (nodeId) => {
            if (fds[nodeId]) {
                return fds[nodeId];
            }
            fds[nodeId] = fs_1.default.createWriteStream(null, { fd: fdsIndex });
            fds[nodeId].on("error", () => {
                // nothing
            });
            fdsIndex = fdsIndex + 1;
            return fds[nodeId];
        };
        const consoleStreamAgentFilter = (0, stream_agent_filter_1.streamAgentFilterGenerator)((context, data) => {
            const fd = getFd(context.debugInfo.nodeId);
            try {
                fd.write(data);
            }
            catch (__e) {
                // nothinfg
            }
            process.stdout.write(data);
        });
        const agentFilters = [
            {
                name: "consoleStreamAgentFilter",
                agent: consoleStreamAgentFilter,
            },
        ];
        const graph = new graphai_1.GraphAI(graph_data, agents, { agentFilters });
        if (args_1.args.verbose) {
            graph.onLogCallback = test_utils_1.callbackLog;
        }
        if (args_1.args.i) {
            args_1.args.i.forEach((injectValue) => {
                const [key, value] = String(injectValue).split("=");
                if (key && value) {
                    graph.injectValue(key, value);
                }
            });
        }
        try {
            const resultAll = !!args_1.args.all;
            const results = await graph.run(resultAll);
            console.log(JSON.stringify(results, null, 2));
        }
        catch (e) {
            console.log("error", e);
        }
        if (args_1.args.log) {
            const logfile = fileFullPath(args_1.args.log);
            fs_1.default.writeFileSync(logfile, JSON.stringify(graph.transactionLogs(), null, 2));
        }
    }
    catch (e) {
        console.log("error", e);
    }
};
main();

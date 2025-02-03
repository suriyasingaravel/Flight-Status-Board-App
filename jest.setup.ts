import "@testing-library/jest-dom";
import { TextEncoder, TextDecoder } from "util";

// Polyfill TextEncoder and TextDecoder for Jest
global.TextEncoder = TextEncoder;

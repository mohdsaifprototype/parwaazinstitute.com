"use strict";

import { ElementFactory } from "../assets/script.js";

export const btn = ElementFactory.makeElement("button", "btn btn-primary", ["type", "data-id"], ["submit", "123"], "Submit");
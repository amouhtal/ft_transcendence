"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EjsAdapter = void 0;
const ejs_1 = require("ejs");
const lodash_1 = require("lodash");
const fs = require("fs");
const path = require("path");
const inlineCss = require("inline-css");
class EjsAdapter {
    constructor(config) {
        this.precompiledTemplates = {};
        this.config = {
            inlineCssOptions: { url: ' ' },
            inlineCssEnabled: true,
        };
        Object.assign(this.config, config);
    }
    compile(mail, callback, mailerOptions) {
        const templateExt = path.extname(mail.data.template) || '.ejs';
        const templateName = path.basename(mail.data.template, path.extname(mail.data.template));
        const templateDir = mail.data.template.startsWith('./')
            ? path.dirname(mail.data.template)
            : lodash_1.get(mailerOptions, 'template.dir', '');
        const templatePath = path.join(templateDir, templateName + templateExt);
        if (!this.precompiledTemplates[templateName]) {
            try {
                const template = fs.readFileSync(templatePath, 'UTF-8');
                this.precompiledTemplates[templateName] = ejs_1.compile(template, Object.assign(Object.assign({}, lodash_1.get(mailerOptions, 'template.options', {})), { filename: templatePath }));
            }
            catch (err) {
                return callback(err);
            }
        }
        const rendered = this.precompiledTemplates[templateName](mail.data.context);
        const render = (html) => {
            if (this.config.inlineCssEnabled) {
                inlineCss(html, this.config.inlineCssOptions).then((html) => {
                    mail.data.html = html;
                    return callback();
                });
            }
            else {
                mail.data.html = html;
                return callback();
            }
        };
        if (typeof rendered === 'string') {
            render(rendered);
        }
        else {
            rendered.then(render);
        }
    }
}
exports.EjsAdapter = EjsAdapter;

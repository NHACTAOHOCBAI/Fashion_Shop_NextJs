import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

function Footer() {
    const footerLinks = {
        company: [
            { name: "About Us", href: "#" },
            { name: "Careers", href: "#" },
            { name: "Press", href: "#" },
            { name: "Sustainability", href: "#" }
        ],
        support: [
            { name: "Help Center", href: "#" },
            { name: "Size Guide", href: "#" },
            { name: "Shipping", href: "#" },
            { name: "Returns", href: "#" }
        ],
        legal: [
            { name: "Privacy Policy", href: "#" },
            { name: "Terms of Service", href: "#" },
            { name: "Cookie Policy", href: "#" },
            { name: "Accessibility", href: "#" }
        ]
    };

    const socialLinks = [
        { icon: Facebook, href: "#", label: "Facebook" },
        { icon: Instagram, href: "#", label: "Instagram" },
        { icon: Twitter, href: "#", label: "Twitter" },
        { icon: Youtube, href: "#", label: "YouTube" }
    ];

    return (
        <footer className="bg-white border-t border-gray-200">
            <div className="mx-auto w-[1200px] py-[20px]">
                <div className="py-12">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                        {/* Brand */}
                        <div className="col-span-1">
                            <h3 className="text-xl font-medium text-black mb-4">MODÉ</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                Contemporary fashion for the modern lifestyle.
                                Discover timeless pieces crafted with attention to detail and quality.
                            </p>
                        </div>

                        {/* Company Links */}
                        <div>
                            <h4 className="font-medium text-black mb-4">Company</h4>
                            <ul className="space-y-2">
                                {footerLinks.company.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-black transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Support Links */}
                        <div>
                            <h4 className="font-medium text-black mb-4">Support</h4>
                            <ul className="space-y-2">
                                {footerLinks.support.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-black transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Links */}
                        <div>
                            <h4 className="font-medium text-black mb-4">Legal</h4>
                            <ul className="space-y-2">
                                {footerLinks.legal.map((link) => (
                                    <li key={link.name}>
                                        <a
                                            href={link.href}
                                            className="text-gray-600 hover:text-black transition-colors text-sm"
                                        >
                                            {link.name}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-200 py-6">
                    <div className="flex flex-col sm:flex-row justify-between items-center">
                        <p className="text-gray-600 text-sm">
                            © 2025 MODÉ. All rights reserved.
                        </p>

                        {/* Social Links */}
                        <div className="flex space-x-4 mt-4 sm:mt-0">
                            {socialLinks.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <a
                                        key={social.label}
                                        href={social.href}
                                        className="text-gray-600 hover:text-black transition-colors"
                                        aria-label={social.label}
                                    >
                                        <Icon className="h-5 w-5" />
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
export default Footer
import { AiFillGithub } from "react-icons/ai";
import { FaInstagram } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
    let year = new Date().getFullYear();
    return (
        <footer className="relative bg-third text-fourth pt-8 pb-4">
            <div className="w-[85%] mx-auto ">
                <div className="flex flex-wrap text-left lg:text-left">
                    <div className="w-full lg:w-6/12">
                        <h4 className="text-3xl fonat-semibold text-blueGray-700">
                            Let&apos;s keep in touch!
                        </h4>
                        <ul className="flex gap-4 mt-6 lg:mb-0 mb-6">
                            <li className="hover:scale-125">
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://github.com/soufianemou"
                                    aria-label="GitHub Profile"
                                >
                                    <FaLinkedin className="h-10 w-10" />
                                </a>
                            </li>
                            <li className="hover:scale-125">
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://github.com/soufianemou"
                                    aria-label="GitHub Profile"
                                >
                                    <AiFillGithub className="h-10 w-10" />
                                </a>
                            </li>
                            <li className="hover:scale-125">
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://github.com/soufianemou"
                                    aria-label="GitHub Profile"
                                >
                                    <FaInstagram className="h-10 w-10" />
                                </a>
                            </li>
                            <li className="hover:scale-125">
                                <a
                                    target="_blank"
                                    rel="noreferrer"
                                    href="https://github.com/soufianemou"
                                    aria-label="GitHub Profile"
                                >
                                    <FaXTwitter className="h-10 w-10" />
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div className="w-full lg:w-6/12 lg:px-4">
                        <div className="flex flex-wrap items-top mb-6">
                            <div className="w-full lg:w-4/12 lg:px-4 ml-auto">
                                <span className="block text-sm font-semibold mb-2 underline">
                                    Useful Links:
                                </span>
                                <ul className="list-unstyled">
                                    <li>
                                        <a
                                            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                            href="https://www.linkedin.com/in/soufiane-mouahhidi/"
                                        >
                                            About Me
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                            href="https://github.com/soufianemou"
                                        >
                                            Github
                                        </a>
                                    </li>
                                    <li>
                                        <a
                                            className="text-blueGray-600 hover:text-blueGray-800 font-semibold block pb-2 text-sm"
                                            href="https://soufianemouahhidi.vercel.app/"
                                        >
                                            Portfolio
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <hr className="my-6 border-blueGray-300" />
                <div className="flex flex-wrap items-center md:justify-between justify-center">
                    <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                        <div className="text-sm  font-semibold py-1">
                            Copyright ©{" "}
                            <span id="get-current-year">{year} Cmc In.</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

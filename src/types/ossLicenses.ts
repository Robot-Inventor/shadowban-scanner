import { createIs } from "typia";

type OSSLicenses = Array<{
    name: string;
    version?: string;
    repository: string;
    source?: string;
    license: string;
    licenseText: string;
}>;

const isOSSLicenses = createIs<OSSLicenses>();

export { type OSSLicenses, isOSSLicenses };

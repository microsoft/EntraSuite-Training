## Microsoft Entra Suite – Scenario 2
## Modernize remote access (Secure and governed access to all applications and resources)

## Introduction
In this guide, we describe how to configure Microsoft Entra Suite products for a scenario in which the fictional organization, Contoso, is upgrading their existing VPN solution. The new, scalable cloud-based solution helps them to move towards Secure Access Service Edge (SASE). To accomplish this objective, they deploy [Microsoft Entra Internet Access](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-internet-access), [Microsoft Entra Private Access](https://learn.microsoft.com/en-us/entra/global-secure-access/concept-private-access), and [Microsoft Entra ID Protection](https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection).

Microsoft Entra Private Access provides users (whether in an office or working remotely) secure access to private corporate resources. Microsoft Entra Private Access builds on the Microsoft Entra application proxy to extend access to any private resource, independent of TCP/IP port and protocol.

Remote users can connect to private apps across hybrid and multi-cloud environments, private networks, and data centers from any device and network without requiring a VPN solution. The service offers per-app adaptive access based on Conditional Access (CA) policies for more granular security than a traditional VPN solution.

Microsoft Entra ID Protection cloud-based identity and access management (IAM) solution helps protect user identities and credentials from compromise.

You can replicate these high-level steps for the Contoso solution as described in this guide.
1.	Sign up for Microsoft Entra Suite. Enable and configure Microsoft Entra Internet and Private Access to desired network and security settings.
2.	Deploy [Microsoft Global Secure Access client](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client) on user devices and [Microsoft Entra Private Access connector](https://learn.microsoft.com/en-us/entra/architecture/sse-deployment-guide-private-access)s on private networks. Include multi-cloud IaaS based virtual networks to access apps and resources on Contoso networks.
3.	Set up private apps as [Global Secure Access apps](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-per-app-access). Assign appropriate users and groups. Set up [Conditional Access policies](https://learn.microsoft.com/en-us/entra/identity/conditional-access/plan-conditional-access) for those apps and users. With this setup, you can achieve minimum access by allowing access only to users and groups that require access.
4.	Enable Microsoft [Entra ID Protection](https://learn.microsoft.com/en-us/entra/id-protection/overview-identity-protection) for users to allow administrators to investigate and remediate risks to keep organizations safe and secure. Risks can be fed into tools like Conditional Access to make access decisions and fed back to a security information and event management (SIEM) tool for investigation.
5.	Use enhanced logs and analytics from Microsoft Entra Internet Access, Microsoft Entra Private Access, and Microsoft Entra ID Identity Protection to track and evaluate network and security status. This configuration helps your Security Operations Center (SOC) team to promptly detect and examine threats to prevent escalation.

Microsoft Entra solutions offer these advantages over VPN:
* Easier and consolidated management
* Lower expenses
* Better security and visibility
* Smoother user experience and efficiency
* Preparedness for SASE

These are the benefits of using these three solutions together:

* **Simplified and unified management**. Manage all network and security functions from a single cloud-based console to reduce the complexity and cost of maintaining multiple solutions and appliances.
* **Enhanced security and visibility**. Enforce granular and adaptive access policies based on identity and context of users and devices as well as application and data sensitivity and location. Use enriched logs and analytics to gain insights into network and security posture to detect and more quickly respond to threats.
* **Improved user experience and productivity**. Provide users with fast and seamless access to necessary apps and resources without compromising security or performance. Support hybrid and remote work scenarios with cloud-delivered solutions that scale on demand and adapt to changing network conditions.
* **Reduced costs and network complexity**. Reduce operational costs by eliminating the need to operate and monitor world-wide complex VPN gateway infrastructures. Leverage simplified access policies by using compliant network check with Conditional Access.


## Requirements
This section defines the requirements for this scenario’s solution.

## Permissions
Administrators who interact with Global Secure Access preview features require the Global Secure Access Administrator and Application Administrator roles.

Conditional Access (CA) policy configuration requires the Conditional Access Administrator or Security Administrator role. Some features may require additional roles.

## Prerequisites
To successfully deploy and test this scenario, configure these prerequisites:
1.	Microsoft Entra tenant with Microsoft Entra ID P1 license. Configure Microsoft Entra ID P2 to test Identity Protection. [Purchase licenses or obtain trial licenses](https://www.microsoft.com/en-us/security/business/microsoft-entra-pricing).
    * One user with at least Global Secure Access Administrator and Application Administrator roles to configure Microsoft's Security Service Edge
    * At least one user as client test user in your tenant
2.	One Windows client device with this configuration:
    * Windows 10/11 64-bit version
    * Microsoft Entra joined or hybrid joined
    * Internet connected and no corpnet access or VPN
3.	Download and install Global Secure Access Client on client device. The [Global Secure Access Client for Windows](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-install-windows-client) article describes prerequisites and installation.
4.	To test Microsoft Entra Private Access, configure a Windows server to function as the resource server:
    * Windows Server 2012 R2 or later
    * A file share
5.	To test Microsoft Entra Private Access, configure a Windows server to function as the connector server:
    * Windows Server 2012 R2 or later
    * Network connectivity to Microsoft Entra service
    * Ports 80 and 443 open to [outbound traffic](https://learn.microsoft.com/en-us/entra/global-secure-access/how-to-configure-connectors#open-ports)
    * Allow access to required URLs
6.	Establish connectivity between connector server and application server. Confirm access to test application on the application server (for example, successful file share access).
This diagram illustrates the minimum architecture requirements to deploy and test Microsoft Entra Private Access:
![imagen 1](../images/RemoteA-01.png)




